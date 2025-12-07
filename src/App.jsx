import { useRef } from 'react';
import styles from './app.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w_%+-]+@[\w-]+\.[\w]{2,}$/,
			`Пожалуйста, введите корректный email-адрес. Убедитесь, что:
				- он содержит символ "@"
				- в имени пользователя (до "@") используются только латинские буквы, цифры, точки, подчёркивания, %, + или -
				- в доменном имени (после "@") используются только латинские буквы, цифры и дефисы
				- есть хотя бы одна точка (например, example.com)`,
		)
		.required('Поле "email" обязательно для заполнения'),
	password: yup
		.string()
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
			`Пожалуйста, введите корректный пароль. Убедитесь, что он содержит:
				- минимум 8 символов
				- минимум одну цифру
				- минимум одну строчную латинскую букву
				- минимум одну заглавную латинскую букву`,
		)
		.required('Поле "пароль" обязательно для заполнения'),
	passwordCheck: yup
		.string()
		.required('Поле "повторите пароль" обязательно для заполнения')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordCheck: '',
		},
		resolver: yupResolver(formSchema),
	});

	const registerRef = useRef(null);

	const emailErr = errors.email?.message;
	const passwordErr = errors.password?.message;
	const checkPasswordErr = errors.passwordCheck?.message;

	function onSubmit(formData) {
		if (registerRef.current) {
			registerRef.current.focus();
		}
		console.log(formData);
	}

	return (
		<div className={styles['registration-form']}>
			<h1>Регистрация</h1>
			{emailErr && <div className={styles.error}>{emailErr}</div>}
			{passwordErr && <div className={styles.error}>{passwordErr}</div>}
			{checkPasswordErr && <div className={styles.error}>{checkPasswordErr}</div>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email')}
					type="email"
					name="email"
					placeholder="Введите email"
				/>
				<input
					{...register('password')}
					type="password"
					name="password"
					placeholder="Введите пароль"
				/>
				<input
					{...register('passwordCheck')}
					type="password"
					name="passwordCheck"
					placeholder="Повторите пароль"
				/>
				<button
					ref={registerRef}
					type="submit"
					disabled={!!checkPasswordErr || !!emailErr || !!passwordErr}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
