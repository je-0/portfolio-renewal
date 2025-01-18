// Global Variables
const $window = window;
const $document = document;
const $scrollBody = document.documentElement || document.body;
const $appHeader = document.querySelector('.app-header');
const $appFooter = document.querySelector('.app-footer');
const $body = document.body;

// Global Variables
let winW = $window.innerWidth;
let winH = $window.innerHeight;
let docH = $document.documentElement.scrollHeight;
let st = $window.scrollY;

// Scroll Top
const $btnTop = document.querySelector('.js-btn-top');
const btnTopAction = {
    init: function() {
        this.click();
    },
    click: function() {
        if ($btnTop) {
            $btnTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' 
                });
            });
        }
    }
};
if ($btnTop) btnTopAction.init();

// Scroll event
const $motionItems = document.querySelectorAll('.js-motion-item');
if ($motionItems.length) {
    $window.addEventListener('scroll', function() {
        const st = $window.scrollY;
        const winHt = $window.innerHeight;
        $motionItems.forEach(function(item) {
            const secTop = item.getBoundingClientRect().top + st;
            if (st > secTop - (winHt / 2)) {
                item.classList.add('is-motion-active');
            }
            // 반응형
            if (winW > 640) {
                if (st > secTop - (winHt / 1.5)) {
                    item.classList.add('is-motion-active');
                }
            }
        });
    });
}

// header / btn-top
$window.addEventListener('scroll', function() {
    const st = $window.scrollY;
    if (st > 0) {
        $appHeader.classList.add('is-active');
        $btnTop.classList.add('is-active');
    } else {
        $appHeader.classList.remove('is-active');
        $btnTop.classList.remove('is-active');
    }
});

// Layer [s]
const $layerWrap = document.querySelector('.layer-wrap');
const layerAction = {
    open: function(layerName) {
        const layer = $layerWrap.querySelector('.layer[data-layer-name="' + layerName + '"]');
        if (layer) {
            layer.parentElement.classList.add('is-active');
            $body.classList.add('is-hidden');
            $layerWrap.querySelectorAll('.layer').forEach(function(layerItem) {
                if (layerName === layerItem.getAttribute('data-layer-name')) {
                    layerItem.classList.add('is-active');
                    layerItem.querySelector('.btn-layer-close').classList.add('is-active');
                    $layerWrap.scrollTop = 0;
                } else {
                    layerItem.classList.remove('is-active');
                }
            });
        } else { 
            $layerWrap.classList.remove('is-active');
            $body.classList.remove('is-hidden');
        }
    },
    close: function() {
        const layers = $layerWrap.querySelectorAll('.layer');
        $layerWrap.classList.remove('is-active');
        layers.forEach(function(layer) {
            layer.classList.remove('is-active');
            layer.querySelector('.btn-layer-close').classList.remove('is-active');
        });
        $body.classList.remove('is-hidden');
    },
    bind: function($obj) {
        $obj.forEach(function(obj) {
            obj.addEventListener('click', function(e) {
                e.stopPropagation();
                const layerName = obj.getAttribute('data-layer-name');
                layerAction.open(layerName);
            });
        });
    }
};

// Close Layer
const $layers = document.querySelectorAll('.layer');
$layers.forEach(function(layer) {
    layer.addEventListener('click', function(e) {
        if (e.target.matches('.btn-layer-close, .js-layer-close')) {
            e.stopPropagation();
            layerAction.close();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const layerOpenButtons = document.querySelectorAll('.js-layer-open');
    layerAction.bind(layerOpenButtons);
});


// darkmode
let toggleBtn = $appFooter.querySelector('.switch-box input');
let toggleText = document.querySelector('.toggle-txt');
toggleBtn.addEventListener('change', function() {
    $body.classList.toggle('dark-mode', this.checked);
    if (this.checked) {
        toggleText.textContent = '라이트 모드';
    } else {
        toggleText.textContent = '다크 모드';
    } 
});


