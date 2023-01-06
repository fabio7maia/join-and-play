interface LoggerInitMethodInput {
	enable?: boolean;
}

export class Logger {
	private static enable = false;

	static init = ({ enable }: LoggerInitMethodInput) => {
		Logger.enable = enable || false;
	};

	static log = (msg: string, ...rest: any[]) => {
		if (!Logger.enable) {
			return;
		}

		console.log(msg, rest);
	};
}

Logger.init({
	enable: process.env.NODE_ENV === 'development',
});
