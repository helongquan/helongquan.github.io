document.addEventListener("DOMContentLoaded", function() {
    var helo_failedImages = JSON.parse(localStorage.getItem('helofailedImages')) || [];

    function helong_handleFailedImages() {
        var images = document.querySelectorAll(".post-content img");
        images.forEach(function(img) {
            var src = img.src;
            if (helo_failedImages.includes(src)) {
                img.style.display = 'none'; // 隐藏已知加载失败的图片
            } else {
                (function(img, src) {
                    var testImg = new Image();
                    testImg.onload = function() {
                        // 图片加载成功，保持显示
                    };
                    testImg.onerror = function() {
                        // 图片加载失败，记录失败图片并隐藏
                        helo_failedImages.push(src); // 添加到失败列表中
                        localStorage.setItem('helofailedImages', JSON.stringify(helo_failedImages));
                        img.style.display = 'none'; // 隐藏失败的图片
                    };
                    testImg.src = src; // 触发加载
                })(img, src);
            }
        });
    }

    setTimeout(function() {
        helong_handleFailedImages();
    }, 1000); // 延迟2秒执行处理函数，确保页面加载完成

    // 初始化mermaid
    // mermaid.initialize({ startOnLoad: true });
});

