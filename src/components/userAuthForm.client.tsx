'use client';

import React from 'react';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { SiGithub, SiGoogle } from 'react-icons/si';

import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { useI18n } from '@hooks';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	session?: Session | null;
}

export function UserAuthForm({ className, session, ...props }: UserAuthFormProps) {
	const { t } = useI18n();

	return (
		<>
			<Center p={8}>
				<Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
					<Button w={'full'} colorScheme={'gray'} leftIcon={<SiGithub />} onClick={() => signIn('github')}>
						<Center>
							<Text>Login With Github</Text>
						</Center>
					</Button>

					<Button w={'full'} colorScheme={'blue'} leftIcon={<SiGoogle />} onClick={() => signIn('google')}>
						<Center>
							<Text>Login With Google</Text>
						</Center>
					</Button>
				</Stack>
			</Center>
		</>
	);

	// TODO: refine code
	// const [email, setEmail] = React.useState<StringNumber>('');
	// const [password, setPassword] = React.useState<StringNumber>('');

	// const handleOnEmailChange = React.useCallback((value?: StringNumber | undefined): void => {
	// 	setEmail(value || '');
	// }, []);

	// const handleOnPasswordChange = React.useCallback((value?: StringNumber | undefined): void => {
	// 	setPassword(value || '');
	// }, []);

	// return (
	// 	<div className="bg-no-repeat bg-cover bg-center relative">
	// 		{/* TODO: the next line create a layer in mobile doesn't allow click in buttons*/}
	// 		{/* <div className="absolute bg-gradient-to-b from-blue-500 inset-0 z-0"></div> */}
	// 		<div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
	// 			<div className="flex-col flex  self-center p-10 z-10">
	// 				<div className="self-start hidden lg:flex flex-col  text-white">
	// 					<div className="avatar">
	// 						<div className="w-24 rounded-full">
	// 							{/* TODO: Use Image from Next/image */}

	// 							{session?.user?.image && <img src={session?.user?.image} alt="avatar" />}
	// 						</div>
	// 					</div>
	// 					<h1 className="mb-3 font-bold text-5xl">
	// 						{t('login.welcomeMessage', { username: session?.user?.name || '' })}
	// 					</h1>
	// 				</div>
	// 			</div>
	// 			<div className="flex justify-center self-center  z-10">
	// 				<div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
	// 					<div className="mb-4">
	// 						<h3 className="font-semibold text-2xl text-gray-800">{t('login.title')}</h3>
	// 						<p className="text-gray-500">{t('login.subtitle')}</p>
	// 					</div>
	// 					<div className="space-y-5">
	// 						<div className="space-y-2">
	// 							<Input
	// 								key="loginEmail"
	// 								type="email"
	// 								formControl={{
	// 									label: t('login.email'),
	// 								}}
	// 								value={email}
	// 								className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
	// 								placeholder={t('login.emailPlaceholder')}
	// 								onChange={handleOnEmailChange}
	// 							/>
	// 						</div>
	// 						<div className="space-y-2">
	// 							<Input
	// 								key="loginPassword"
	// 								type="password"
	// 								formControl={{
	// 									label: t('login.password'),
	// 								}}
	// 								value={password}
	// 								className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
	// 								placeholder={t('login.passwordPlaceholder')}
	// 								onChange={handleOnPasswordChange}
	// 							/>
	// 						</div>
	// 						<div className="flex items-center justify-between">
	// 							<div className="flex items-center">
	// 								<input
	// 									id="remember_me"
	// 									name="remember_me"
	// 									type="checkbox"
	// 									className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
	// 								/>
	// 								<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
	// 									{t('login.remember')}
	// 								</label>
	// 							</div>
	// 							<div className="text-sm">
	// 								<a href="#" className="text-blue-400 hover:text-blue-500">
	// 									{t('login.forgot')}
	// 								</a>
	// 							</div>
	// 						</div>
	// 						<div>
	// 							<button
	// 								type="submit"
	// 								className="btn-disabled w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
	// 							>
	// 								{t('login.signIn')}
	// 							</button>
	// 						</div>
	// 						<div>
	// 							<div className={cn('grid gap-6', className)} {...props}>
	// 								<button
	// 									type="submit"
	// 									className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
	// 									onClick={() => signIn('github')}
	// 								>
	// 									<div className="w-6">
	// 										<svg
	// 											className="mr-2 h-4 w-4"
	// 											aria-hidden="true"
	// 											focusable="false"
	// 											data-prefix="fab"
	// 											data-icon="github"
	// 											role="img"
	// 											xmlns="http://www.w3.org/2000/svg"
	// 											viewBox="0 0 496 512"
	// 										>
	// 											<path
	// 												fill="currentColor"
	// 												d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
	// 											></path>
	// 										</svg>
	// 									</div>
	// 									{t('login.github')}
	// 								</button>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<div className={cn('grid gap-6', className)} {...props}>
	// 								<button
	// 									type="submit"
	// 									className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
	// 									onClick={() => signIn('google')}
	// 								>
	// 									<div className="w-6">
	// 										<svg
	// 											className="mr-2 h-4 w-4"
	// 											viewBox="-0.5 0 48 48"
	// 											version="1.1"
	// 											xmlns="http://www.w3.org/2000/svg"
	// 										>
	// 											<g id="Color-" transform="translate(-401.000000, -860.000000)">
	// 												<g id="Google" transform="translate(401.000000, 860.000000)">
	// 													<path
	// 														d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
	// 														id="Fill-1"
	// 														fill="#FBBC05"
	// 													></path>
	// 													<path
	// 														d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
	// 														id="Fill-2"
	// 														fill="#EB4335"
	// 													></path>
	// 													<path
	// 														d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
	// 														id="Fill-3"
	// 														fill="#34A853"
	// 													></path>
	// 													<path
	// 														d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
	// 														id="Fill-4"
	// 														fill="#4285F4"
	// 													></path>
	// 												</g>
	// 											</g>
	// 										</svg>
	// 									</div>
	// 									{t('login.google')}
	// 								</button>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div className="pt-5 text-center text-gray-400 text-xs">
	// 						<span>Copyright © 2023</span>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}
