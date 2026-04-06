export function formatCurrency(ammount : number){
    return new Intl.NumberFormat('en-CL', {
        style: 'currency',
        currency: 'cl'
    })
}