import { lang, make, status } from './frontend-operations.js';

/** Adds password recovery without changing login.html design.
 * Redirect URL must be allow-listed in Supabase Auth -> URL Configuration.
 */
export function installAccountRecovery(supabase) {
  const trigger=document.querySelector('.forgot-password-link');
  if(!trigger || trigger.dataset.recoveryBound) return;
  trigger.dataset.recoveryBound='true';
  trigger.addEventListener('click',async e=>{
    e.preventDefault();
    const existing=document.querySelector('#sci-recovery');if(existing){existing.remove();return;}
    const box=make('section');box.id='sci-recovery';box.className='sci-card';
    const title=make('h2',lang('Réinitialiser le mot de passe','Reset password'));
    const form=make('form');form.className='sci-form';
    const label=make('label',lang('Adresse e-mail','Email address'));label.className='sci-field';
    const input=document.createElement('input');input.type='email';input.required=true;input.maxLength=254;input.autocomplete='email';input.value=document.querySelector('#email')?.value || '';label.append(input);form.append(label);
    const submit=make('button',lang('Envoyer le lien','Send reset link'),'btn-primary');submit.type='submit';
    const feedback=make('p');feedback.setAttribute('aria-live','polite');form.append(submit,feedback);box.append(title,form);
    trigger.after(box);input.focus();
    form.addEventListener('submit',async ev=>{
      ev.preventDefault();if(!form.reportValidity())return;submit.disabled=true;
      try {
        const redirectTo=new URL('login.html',location.href).href;
        const {error}=await supabase.auth.resetPasswordForEmail(input.value.trim(),{redirectTo});
        if(error)throw error;
        status(feedback,lang('Si cette adresse existe, un lien de réinitialisation sera envoyé.','If this address exists, a reset link will be sent.'));
      } catch(error){console.error('Password reset request failed',error);status(feedback,lang('Envoi impossible. Réessayez.','Unable to send. Please retry.'),true);}
      finally{submit.disabled=false;}
    });
  });
  supabase.auth.onAuthStateChange((event)=>{
    if(event!=='PASSWORD_RECOVERY')return;
    if(document.querySelector('#sci-update-password'))return;
    const box=make('section');box.id='sci-update-password';box.className='sci-card';
    const title=make('h2',lang('Choisir un nouveau mot de passe','Choose a new password'));
    const form=make('form');form.className='sci-form';
    const label=make('label',lang('Nouveau mot de passe (12 caractères minimum)','New password (12 characters minimum)'));label.className='sci-field';
    const input=document.createElement('input');input.type='password';input.required=true;input.minLength=12;input.maxLength=128;input.autocomplete='new-password';label.append(input);
    const button=make('button',lang('Mettre à jour','Update password'),'btn-primary');button.type='submit';
    const feedback=make('p');feedback.setAttribute('aria-live','polite');form.append(label,button,feedback);box.append(title,form);
    document.querySelector('.login-content')?.append(box);input.focus();
    form.addEventListener('submit',async e=>{
      e.preventDefault();if(!form.reportValidity())return;button.disabled=true;
      try {const {error}=await supabase.auth.updateUser({password:input.value});if(error)throw error;
        status(feedback,lang('Mot de passe mis à jour. Vous pouvez vous connecter.','Password updated. You can sign in.'));
        await supabase.auth.signOut();
      } catch(error){console.error('Password update failed',error);status(feedback,lang('Mise à jour impossible.','Update failed.'),true);}finally{button.disabled=false;}
    });
  });
}
