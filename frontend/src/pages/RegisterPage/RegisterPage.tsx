import styles from './RegisterPage.module.css';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { useTranslation } from '../../shared/i18n/useTranslation';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import ErrorBox from '../../shared/ui/ErrorBox/ErrorBox';

export default function RegisterPage() {
	const { register } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();
	
		type FormFields =
			| 'username'
			| 'email'
			| 'password';
	
		type FormValues = {
			username: string;
			email: string;
			password: string;
		}

		const validationRegister: {
			username: () => void;
			email: () => void;
			password: () => void;
		} = {
			username: () => validateUsername(),
			email: () => validateEmail(),
			password: () => validatePassword()
		};
	
		const [errors, setErrors] = useState<Record<FormFields | 'submit', string | null>>({
			username: null,
			email: null,
			password: null,
			submit: null
		});
	
		const [values, setValues] = useState<FormValues>({
			username: '',
			email: '',
			password: ''
		});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let value = e.currentTarget.value;
		let name = e.currentTarget.name;

		switch (name) {
			case 'username':
					value = value.replace(/[^a-zA-Z0-9_.-]/g, '');
					break;

			case 'email':
					value = value.replace(/[^a-zA-Z0-9@._+-]/g, '');
					break;
		}
		
		setValues(prev => ({...prev, [name]: value}));
	}

	function validate(e: React.FocusEvent<HTMLInputElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as FormFields];
		if (currentValidation){
			currentValidation();
		}
	}

	function validateUsername() {
		let value = values.username.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, username: t('formError.usernameRequired')}));
			return;
		}

		if (value.length < 3) {
			setErrors(prev => ({...prev, username: t('formError.usernameTooShort')}));
			return;
		}

		if (value.length > 254){
			setErrors(prev => ({...prev, username: t('formError.usernameTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, username: null}));
	}

	function validateEmail() {
		let value = values.email.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, email: t('formError.emailRequired')}));
			return;
		}

		if (value.length < 3) {
			setErrors(prev => ({...prev, email: t('formError.emailTooShort')}));
			return;
		}

		if (value.length > 254){
			setErrors(prev => ({...prev, email: t('formError.emailTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, email: null}));
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
			values.username.trim().length > 0 &&
			values.email.trim().length > 0 &&
			values.password.trim().length > 0
		) { 
			return true;
		}
		return false;
	}


	async	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const registered = await register(values.username, values.email, values.password);
		
		if ( !registered ){
			setErrors(prev => ({...prev, submit: t('formError.registerError')}));
			setValues({
				username: '',
				email: '',
				password: ''
			});
		} else {
			navigate("/dashboard"); 
		}
		
	}

	return (
		<div className={styles.registerForm}>
				<form onSubmit={handleSubmit}>

					<div className={styles.registerFormElement}>
						<div className={styles.inputWrapper}>
							<input 
								className={styles.usernameInput} 
								id='usernameInput' 
								name='username' 
								type='text' 
								onChange={handleChange} 
								onBlur={validate} 
								value={values.username}
								placeholder={t('username')}
							/>
							{errors.username ? <ErrorBox message={errors.username} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.registerFormElement}>
						<div className={styles.inputWrapper}>
							<input 
								className={styles.emailInput} 
								id='emailInput' 
								name='email' 
								type='text' 
								onChange={handleChange} 
								onBlur={validate} 
								value={values.email}
								placeholder={t('email')}
							/>
							{errors.email ? <ErrorBox message={errors.email} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.registerFormElement}>
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

					<div className={styles.registerFormElement}>
						<div className={styles.inputWrapper}>
							<button type='submit' disabled={Object.values(errors).some((error) => error !== null) || !areRequiredFieldsFilled()}>{t('signUp')}</button>
							{errors.submit ? <ErrorBox message={errors.submit} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.registerFormElement}>
						<p className={styles.additionalText}>{t('haveAcc')}? <NavLink to={'/login'} className={styles.navlink}>{t('signIn')}</NavLink></p>
						
					</div>

				</form>
			</div>
	);
}