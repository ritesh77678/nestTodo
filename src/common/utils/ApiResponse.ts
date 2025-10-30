export class ApiResponse {
    success: boolean
    constructor(
        public status: number, 
        public data: object, 
        public message: string = "Task completed successfully"
    ){
        this.success = status < 400
    }
}