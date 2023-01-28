'use Client';

import { useLogger } from '@hooks';

export default async function AdminPage() {
	const logger = useLogger();

	logger.log('AdminPage > render');

	return (
		<>
			<h1>Admin Page</h1>
		</>
	);
}
