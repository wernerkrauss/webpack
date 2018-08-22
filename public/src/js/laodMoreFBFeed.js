function LoadMore() {

    const allPosts = document.querySelectorAll('.post-single');
    const loadMoreButton = document.querySelector('.posts-loadmore')

    for (let key of Object.keys(allPosts)) {
        if (key <= 2) {
            allPosts[key].classList.add('js-show');
        }
    }

    if (loadMoreButton != null) {
        loadMoreButton.onclick = function (e) {
            e.preventDefault();

            const hiddenPosts = document.querySelectorAll('.post-single:not(.js-show)');

            for (let key of Object.keys(hiddenPosts)) {
                if (key <= 2) {
                    hiddenPosts[key].classList.add('js-show');
                }
            }

            const shownPosts = document.querySelectorAll('.js-show');
            const offsetTop = this.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });

            const topButton = document.querySelector('.posts-top');

            if (shownPosts.length >= 5 && topButton == null) {
                const button = document.createElement('button');
                const targetButton = document.querySelector('.posts-buttons');

                button.classList.add('btn', 'btn-primary', 'posts-top');
                button.innerHTML = 'Top'
                targetButton.append(button);

                const topButton = document.querySelector('.posts-top');
                topButton.onclick = function (e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            }
        }
    }
}

new LoadMore();