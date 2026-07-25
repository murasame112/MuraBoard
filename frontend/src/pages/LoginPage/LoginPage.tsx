import styles from './LoginPage.module.css';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { useTranslation } from '../../shared/i18n/useTranslation';
import { useState } from 'react';
import { NavLink } from 'react-router';
import ErrorBox from '../../shared/ui/ErrorBox/ErrorBox';


export default function LoginPage() {
	const { login } = useAuth();
	const { t } = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState(false);

		type FormFields =
			| 'identifier'
			| 'password';
	
		type FormValues = {
			identifier: string;
			password: string;
		}

		const validationRegister: {
			identifier: () => void;
			password: () => void;
		} = {
			identifier: () => validateIdentifier(),
			password: () => validatePassword()
		};
	
		const [errors, setErrors] = useState<Record<FormFields | 'submit', string | null>>({
			identifier: null,
			password: null,
			submit: null
		});
	
		const [values, setValues] = useState<FormValues>({
			identifier: '',
			password: ''
		});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let value = e.currentTarget.value;
		let name = e.currentTarget.name;
		
		setValues(prev => ({...prev, [name]: value}));
	}

	function validate(e: React.FocusEvent<HTMLInputElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as FormFields];
		if (currentValidation){
			currentValidation();
		}
	}

	function validateIdentifier() {
		let value = values.identifier.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, identifier: t('formError.identifierRequired')}));
			return;
		}

		if (value.length < 3) {
			setErrors(prev => ({...prev, identifier: t('formError.identifierTooShort')}));
			return;
		}

		if (value.length > 254){
			setErrors(prev => ({...prev, identifier: t('formError.identifierTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, identifier: null}));
	}

	function validatePassword() {
		let value = values.password.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, password: t('formError.passwordRequired')}));
			return;
		}

		if (value.length < 8) {
			setErrors(prev => ({...prev, password: t('formError.passwordTooShort')}));
			return;
		}

		if (value.length > 128){
			setErrors(prev => ({...prev, password: t('formError.passwordTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, password: null}));
	}

	function areRequiredFieldsFilled(): boolean {
		if (
			values.identifier.trim().length > 0 &&
			values.password.trim().length > 0
		) { 
			return true;
		}
		return false;
	}


	async	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsSubmitting(true);
		const password = values.password;
		setValues(prev => ({...prev, password: ''}));
		const logged = await login(values.identifier, password);
		
		if ( !logged ) setErrors(prev => ({...prev, submit: t('formError.wrongLoginOrPassword')}));
		setTimeout(() => {
        setErrors(prev => ({ ...prev, submit: null }));
    }, 2000);
		setIsSubmitting(false);
	}

	return (
		<div className={styles.loginForm}>
				<form onSubmit={handleSubmit}>

					<div className={styles.loginFormElement}>
						<div className={styles.inputWrapper}>
							<input 
								className={styles.identifierInput} 
								id='identifierInput' 
								name='identifier' 
								type='text' 
								onChange={handleChange} 
								onBlur={validate} 
								value={values.identifier}
								placeholder={t('usernameOrEmail')}
							/>
							{errors.identifier ? <ErrorBox message={errors.identifier} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.loginFormElement}>
						<div className={styles.inputWrapper}>
							<input 
							className={styles.passwordInput} 
							id='passwordInput' 
							name='password' 
							type='password'
							onChange={handleChange} 
							onBlur={validate} 
							value={values.password}
							placeholder={t('password')}
						/>
							{errors.password ? <ErrorBox message={errors.password} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.loginFormElement}>
						<div className={styles.inputWrapper}>
							<button 
									type='submit' 
									disabled={
													Object.values(errors).some((error) => error !== null) 
											|| 	!areRequiredFieldsFilled()
											||	isSubmitting
											}>{isSubmitting ? t('loading') : t('signIn')}</button>
							{errors.submit ? <ErrorBox message={errors.submit} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.registerFormElement}>
						<p className={styles.additionalText}>{t('noAcc')}? <NavLink to={'/register'} className={styles.navlink}>{t('signUp')}</NavLink></p>
					</div>

				</form>
			</div>
	);
}