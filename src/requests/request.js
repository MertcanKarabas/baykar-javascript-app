export const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Ağ isteği sırasında bir sorun oluştu.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hata:', error);
        return []; // Hata durumunda boş bir array döndürüyoruz
    }
};