export interface BackendOffer {
	id: string;
	isBento: boolean;
	price: number;
	filling: { name: string; price: number }[];
	optionally: { name: string; price: number }[];
}

export interface OrderItem {
	id: number;
	name: string;
	price: number;
	weight: number;
	fillings?: { name: string; price: number }[];
	optional?: { name: string; price: number }[];
}

export interface FrontendOrder {
	shoppingCart: {
		orderId: string;
		cakeId: string;
		title: string;
		image: string;
		weight: { weightValue: number; isChecked: boolean; value?: number }[];
		filling: Record<string, boolean>;
		optional: Record<string, boolean>;
		price: number;
		quantity: number;
	}[];
	userData: {
		name: string;
		phone: string;
		address: string;
		comment: string;
	};
	finalSum: number;
}

export interface CreateOrderDTO {
	customerName: string;
	customerPhone: string;
	customerEmail?: string;
	deliveryMethod: 'pickup' | 'delivery';
	deliveryAddress?: string;
	deliveryDate: string;
	deliveryTime: string;
	comment?: string;
	totalPrice: number;
	originalPrice?: number;
	items: OrderItem[];
}

export interface Order extends CreateOrderDTO {
	id: number;
	status: 'new' | 'processing' | 'done';
	createdAt: string;
}
