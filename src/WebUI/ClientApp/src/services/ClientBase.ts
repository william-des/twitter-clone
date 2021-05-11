import authService from "../auth/AuthorizeService";

export class ClientBase {

    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        let token = await authService.getAccessToken();
        options.headers = {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        };
        return Promise.resolve(options);
    };
}