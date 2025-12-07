import { useState } from 'react';
import styles from './app.module.css';

function App() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordCheck: '',
	});
	const [error, setError] = useState({
		emailErr: false,
		passwordErr: false,
		checkPasswordErr: false,
	});

	function onChange({ target }, check) {
		setFormData((prevData) => {
			const newData = { ...prevData };
			newData[target.name] = target.value;
			return newData;
		});
		if (check) {
			if (target.value !== formData.password) {
				setError({ ...error, checkPasswordErr: 'Пароли не совпадают' });
			} else {
				setError({ ...error, checkPasswordErr: null });
			}
		}
	}
	function onEmailBlur() {
		setError({ ...error, emailErr: null });

		let test = /^[\w_%+-]+@[\w-]+\.[\w]{2,}$/.test(formData.email);

		if (!test) {
			setError({
				...error,
				emailErr: `Пожалуйста, введите корректный email-адрес. Убедитесь, что:
				- он содержит символ "@"
				- в имени пользователя (до "@") используются только латинские буквы, цифры, точки, подчёркивания, %, + или -
				- в доменном имени (после "@") используются только латинские буквы, цифры и дефисы
				- есть хотя бы одна точка (например, example.com)`,
			});
		} else {
			setError({ ...error, emailErr: null });
		}
	}

	function onPasswordBlur() {
		setError({ ...error, passwordErr: null });
		let test = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.password);

		if (!test) {
			setError({
				...error,
				passwordErr: `Пожалуйста, введите корректный пароль. Убедитесь, что он содержит:
				- минимум 8 символов
				- минимум одну цифру
				- минимум одну строчную латинскую букву
				- минимум одну заглавную латинскую букву`,
			});
		} else {
			setError({ ...error, passwordErr: null });
		}
	}

	function onSubmit(event) {
		event.preventDefault();
		console.log(formData);
	}

	return (
		<div className={styles['registration-form']}>
			<h1>Регистрация</h1>
			{error.emailErr && <div className={styles.error}>{error.emailErr}</div>}
			{error.passwordErr && <div className={styles.error}>{error.passwordErr}</div>}
			{error.checkPasswordErr && (
				<div className={styles.error}>{error.checkPasswordErr}</div>
			)}
			<form>
				<input
					type="email"
					name="email"
					placeholder="Введите email"
					value={formData.email}
					onChange={onChange}
					onBlur={onEmailBlur}
				/>
				<input
					type="password"
					name="password"
					placeholder="Введите пароль"
					value={formData.password}
					onChange={onChange}
					onBlur={onPasswordBlur}
				/>
				<input
					type="password"
					name="passwordCheck"
					placeholder="Повторите пароль"
					onChange={(event) => onChange(event, 'check')}
				/>
				<button
					type="submit"
					disabled={
						error.checkPasswordErr ||
						error.emailErr ||
						error.passwordErr ||
						!formData.email ||
						!formData.password ||
						!formData.passwordCheck
					}
					onClick={onSubmit}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
