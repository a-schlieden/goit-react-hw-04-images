const KEY = 'key=31200881-a0442d807a70df79b0436fdb6';
const SRC = 'https://pixabay.com/api/';

function fetchImages(formInput, pageNumber) {
    return fetch(`${SRC}?q=${formInput}&page=${pageNumber}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(new Error(`No img with querry ${formInput}`));
    });

}

const api = {
    fetchImages,
};

export default api;