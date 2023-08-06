export interface Data {
	userId: number;
	title: string;
	body: string;
}

export interface IAddAPostRequest {
	name: string;
	url: string;
	method: string;
	data: Data;
}