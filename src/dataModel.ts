'use strict';

interface RequestData {
	FromDate: string;
	ToDate: string;
	Randomize: number;
}

export class DataModel implements RequestData {

	private data: { FromDate: string; ToDate: string; Randomize: number };

	constructor(payload: string) {
		let data = JSON.parse(payload);

		if (!data.FromDate || !data.ToDate || !data.Randomize ) {
			throw new Error('Invalid message payload received: ' + payload);
		}

		this.data = data;
		console.log(data);
	}

	get FromDate(): string {
		return this.data.FromDate;
	}

	get ToDate(): string {
		return this.data.ToDate;
	}

	get Randomize(): number {
		return this.data.Randomize;
	}
}