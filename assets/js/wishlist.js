import BasePage from './base-page';

class Wishlist extends BasePage {

    onReady() {
        // init wishlist icons in product cards
        salla.storage.get('salla::wishlist', []).forEach(id => this.toggleFavoriteIcon(id, true));
    }

    registerEvents() {

        salla.wishlist.event.onAdded((event, id) => this.toggleFavoriteIcon(id));

        salla.wishlist.event.onRemoved((response, id) => {

            this.toggleFavoriteIcon(id, false);

            // just a animation when the item removed from wishlist page
            let item = document.querySelector('#product-wishlist-' + id);

            if(!item){
                return;
            }

            app.anime(item, false)
                .height(0)// -> from 'height' to '0',
                .paddingBottom(0)
                .paddingTop(0)
                .easing('easeInOutQuad')
                .duration(300)
                .complete(() => item.remove() || (document.querySelector('#wishlist>*') || window.location.reload()))
                .play();
        });
    }

    toggleFavoriteIcon(id, isAdded = true) {
        document.querySelectorAll('.btn--wishlist[data-id="' + id + '"]')
            .forEach(btn => {
                app.toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => isAdded);
                app.toggleElement(btn, 'pulse', 'un-favorited', () => isAdded);
            });
    }
}

Wishlist.intiateWhenReady('Wishlist');
