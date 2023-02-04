'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import {
	Avatar,
	Box,
	BoxProps,
	CloseButton,
	Drawer,
	DrawerContent,
	Flex,
	FlexProps,
	HStack,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useI18n } from '@hooks';
import { ExtendedSession } from '@lib';

export interface LinkItemProps {
	name: string;
	href: string;
}

export default function AdminSidebarWithHeader({
	children,
	session,
}: {
	children: React.ReactNode;
	session: ExtendedSession;
}) {
	const { t } = useI18n();

	const links: Array<LinkItemProps> = [
		{ name: t(`crud.district.title`), href: '/admin/district' },
		{ name: t(`crud.county.title`), href: '/admin/county' },
		{ name: t(`crud.category.title`), href: '/admin/category' },
		{ name: t(`crud.users.title`), href: '/admin/users' },
		{ name: t(`crud.games.title`), href: '/admin/games' },
	];

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent links={links} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent links={links} onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} session={session} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
	links: Array<LinkItemProps>;
}

const SidebarContent = ({ onClose, links, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{links.map((link) => (
				<Link
					key={link.name}
					href={link.href}
					style={{ textDecoration: 'none' }}
					_focus={{ boxShadow: 'none' }}
				>
					<Flex
						align="center"
						p="4"
						mx="4"
						borderRadius="lg"
						role="group"
						cursor="pointer"
						_hover={{
							bg: 'cyan.400',
							color: 'white',
						}}
						{...rest}
					>
						{link.name}
					</Flex>
				</Link>
			))}
		</Box>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
	session: ExtendedSession;
}
const MobileNav = ({ onOpen, session, ...rest }: MobileProps) => {
	const handleSignOut = React.useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		signOut();
	}, []);

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<></>}
			/>

			<Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
				Logo
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<></>} />
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar size={'sm'} src={session.user?.image || ''} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">{session.user?.name}</Text>
									<Text fontSize="xs" color="gray.600">
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<></>
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}
						>
							<MenuItem>
								<Link href="/" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
									Go to Home
								</Link>
							</MenuItem>
							<MenuDivider />
							<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
