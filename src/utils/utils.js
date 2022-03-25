export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const formatBalance = (balance) => {
    if (balance) {
        return balance.slice(0,5) + ' ETH';
    }
    return '-';
}