export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/?';
  #API_KEY = '23203162-5bd4fce9443c3feba1bdcfdd5';

  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.qtyPerPage = 12;
  }

  // searchQuery getter
  get query() {
    return this.searchQuery;
  }

  // searchQuery setter
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

  get page() {
    return this.pageNumber;
  }

  set page(newPage) {
    this.pageNumber = newPage;
  }

  async fetchImages() {
    const url = `${this.#BASE_URL}q=${this.searchQuery}&page=${
      this.pageNumber
    }&key=${this.#API_KEY}&image_type=photo&orientation=horizontal&per_page=${
      this.qtyPerPage
    }`;

    try {
      const response = await fetch(url);
      const imageArr = await response.json();
      return imageArr;
    } catch (error) {
      console.log("Something's wrong", error?.message);
    }
  }
}
