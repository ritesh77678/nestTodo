export class ApiResponse <T> {
    success: boolean
    constructor(
        public status: number, 
        public data: T, 
        public message: string = "Task completed successfully"
    ){
        this.success = status < 400
    }
}