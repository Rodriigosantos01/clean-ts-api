export interface HashComparer {
    compare(value: string, gash: string): Promise<boolean>
}