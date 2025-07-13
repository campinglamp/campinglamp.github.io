// 網頁載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化動畫
    initializeAnimations();
    
    // 添加互動效果
    addInteractiveEffects();
    
    // 響應式調整
    handleResponsiveLayout();
});

// 初始化動畫效果
function initializeAnimations() {
    // 為每個區塊添加延遲動畫
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 時間軸動畫
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// 添加互動效果
function addInteractiveEffects() {
    // 為列表項目添加點擊效果
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            this.style.backgroundColor = '#d4edda';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#f8f9fa';
            }, 200);
        });
    });
    
    // 為區塊標題添加懸停效果
    const sectionTitles = document.querySelectorAll('.section h2');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.color = '#3498db';
            this.style.transform = 'scale(1.05)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.color = '#333';
            this.style.transform = 'scale(1)';
        });
    });
}

// 響應式布局處理
function handleResponsiveLayout() {
    function adjustLayout() {
        const screenWidth = window.innerWidth;
        const mainContent = document.querySelector('.main-content');
        
        // 根據螢幕寬度調整佈局
        if (screenWidth <= 480) {
            mainContent.style.gridTemplateColumns = '1fr';
        } else if (screenWidth <= 768) {
            mainContent.style.gridTemplateColumns = '1fr';
        } else if (screenWidth <= 1024) {
            mainContent.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            mainContent.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }
    
    // 初始調整
    adjustLayout();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', adjustLayout);
}

// 平滑滾動效果
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 添加鍵盤導航支援
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // 確保焦點可見
        const focusedElement = document.activeElement;
        if (focusedElement) {
            focusedElement.style.outline = '2px solid #3498db';
        }
    }
});

// 添加無障礙支援
function addAccessibilitySupport() {
    // 為列表項目添加 ARIA 標籤
    const listItems = document.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-label', `項目 ${index + 1}: ${item.textContent}`);
    });
    
    // 為區塊添加 ARIA 標籤
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const title = section.querySelector('h2');
        if (title) {
            section.setAttribute('aria-labelledby', title.id || title.textContent);
        }
    });
}

// 初始化無障礙支援
addAccessibilitySupport();

// 性能優化：使用 requestAnimationFrame 進行動畫
function optimizedAnimation(callback) {
    let ticking = false;
    
    return function() {
        if (!ticking) {
            requestAnimationFrame(callback);
            ticking = true;
        }
    };
}

// 延遲載入圖片（如果有的話）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('JavaScript 錯誤:', e.error);
});

// 載入完成提示
console.log('政治流程圖網頁已載入完成');

// 檢查瀏覽器相容性
function checkBrowserSupport() {
    const features = {
        grid: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex'),
        transitions: CSS.supports('transition', 'all 0.3s ease')
    };
    
    if (!features.grid) {
        console.warn('瀏覽器不支援 CSS Grid，可能影響佈局');
    }
    
    if (!features.flexbox) {
        console.warn('瀏覽器不支援 Flexbox，可能影響佈局');
    }
    
    return features;
}

// 初始化瀏覽器支援檢查
checkBrowserSupport();