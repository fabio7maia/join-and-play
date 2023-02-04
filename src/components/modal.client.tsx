import {
	Button,
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ThemeTypings,
} from '@chakra-ui/react';

export interface ModalsProps extends React.PropsWithChildren {
	title?: string;
	buttons: {
		children: React.ReactNode;
		colorScheme: ThemeTypings['colorSchemes'];
		onClick: () => void;
	}[];
}

export const Modal: React.FC<ModalsProps> = ({ children, buttons, title }) => {
	return (
		<>
			<ChakraModal isOpen closeOnOverlayClick={false} onClose={() => {}}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalBody pb={6}>{children}</ModalBody>

					<ModalFooter>
						{buttons.map((b, index) => (
							<Button key={index} mr={3} {...b} />
						))}
					</ModalFooter>
				</ModalContent>
			</ChakraModal>
		</>
	);
};
