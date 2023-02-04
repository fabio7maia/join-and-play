import React from 'react';

import { Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';

type TableRowItem = Record<string, any>;

interface TableColumn {
	id: string;
	head?: string;
	body: (item: TableRowItem) => React.ReactNode;
}

interface TableProps {
	rowId: (item: TableRowItem) => string | number;
	className?: string;
	items: TableRowItem[];
	columns: TableColumn[];
}

export const Table: React.FC<TableProps> = ({ columns, items }) => {
	return (
		<TableContainer borderRadius="12px" border="1px solid gray">
			<ChakraTable variant="striped">
				<Thead>
					<Tr bgColor={useColorModeValue('gray.100', 'gray.600')}>
						{columns.map(({ id, head }) => {
							return <Th key={`tHead-${id}`}>{head}</Th>;
						})}
					</Tr>
				</Thead>
				<Tbody>
					{items.map((item, index) => (
						<Tr key={`tBody-${index}`}>
							{columns.map(({ id, body }) => {
								return (
									<Td bg="#77D4FC" key={`tBody-${index}-Td${id}`}>
										{body(item)}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</ChakraTable>
		</TableContainer>
	);
};
