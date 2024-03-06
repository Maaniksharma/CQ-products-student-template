interface CustomResponse {
    'end': (statusCode: number, data: string) => void
    'setHeaders': (headers: string) => void
} 

interface CustomRequest {
    body: {[key: string]: string}
    url: string,
    query: string,
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'


type hanlderValue = {
    [key in Method]: (req: CustomRequest, res: CustomResponse) => void;
};


type handler = {[key: string]: hanlderValue}