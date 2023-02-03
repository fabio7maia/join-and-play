'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Inspiration',
		children: [
			{
				label: 'Explore Design Work',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'New & Noteworthy',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'Find Work',
		children: [
			{
				label: 'Job Board',
				subLabel: 'Find your dream design job',
				href: '#',
			},
			{
				label: 'Freelance Projects',
				subLabel: 'An exclusive list for contract work',
				href: '#',
			},
		],
	},
	{
		label: 'Learn Design',
		href: '#',
	},
	{
		label: 'Hire Designers',
		href: '#',
	},
];

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
		>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
				>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

export default function NavBar() {
	const logger = useLogger();
	const currentLoggedUser = trpcClient.whoAmI.useQuery();
	const { isOpen, onToggle } = useDisclosure();

	logger.log('NavBar > render');

	const handleSignOut = React.useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		signOut();
	}, []);

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				<Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Text
						textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
						fontFamily={'heading'}
						color={useColorModeValue('gray.800', 'white')}
					>
						Logo
					</Text>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
					<Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
						Sign In
					</Button>
					<Button
						display={{ base: 'none', md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'pink.400'}
						href={'#'}
						_hover={{
							bg: 'pink.300',
						}}
					>
						Sign Up
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);

	// return (
	// 	<div className="navbar bg-primary text-primary-content">
	// 		<div className="flex-1">
	// 			<a className="btn btn-ghost normal-case text-xl" href="/">
	// 				Join and Play
	// 			</a>
	// 		</div>

	// 		<div className="flex-none">
	// 			{currentLoggedUser.status === 'success' && currentLoggedUser.data?.name ? (
	// 				<div className="dropdown dropdown-end">
	// 					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
	// 						<div className="w-10 rounded-full">
	// 							<img
	// 								src={currentLoggedUser.data.image || undefined}
	// 								alt="user"
	// 								width={48}
	// 								height={48}
	// 							/>
	// 						</div>
	// 					</label>
	// 					<ul
	// 						tabIndex={0}
	// 						className="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-base-700 rounded-box w-52"
	// 					>
	// 						<li>
	// 							<a className="justify-between" href="/admin">
	// 								Admin area
	// 							</a>
	// 						</li>
	// 						<li>
	// 							<a href="/game/list">My games</a>
	// 						</li>
	// 						<li>
	// 							<a href="/player/list">My joined games</a>
	// 						</li>
	// 						<li onClick={handleSignOut}>
	// 							<a>Logout</a>
	// 						</li>
	// 					</ul>
	// 				</div>
	// 			) : (
	// 				<ul className="menu menu-horizontal p-0">
	// 					<li>
	// 						<a href="/login">Login</a>
	// 					</li>
	// 				</ul>
	// 			)}
	// 		</div>
	// 	</div>
	// );
}
