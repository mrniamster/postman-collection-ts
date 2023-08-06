export interface Data {
	id: number;
	title: string;
	body: string;
}

export interface IUpdateAPostRequest {
	name: string;
	url: string;
	method: string;
	data: Data;
}