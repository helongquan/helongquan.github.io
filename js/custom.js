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


// 小工具广告板块轮播 开始
(function () {
    function initAdCarousels() {
        var carousels = document.querySelectorAll('.custom-ad-carousel');
        if (!carousels.length) return;

        carousels.forEach(function(container) {
            var track = container.querySelector('.ad-track');
            var dataList = container.querySelectorAll('.ad-data li');
            var dotsContainer = container.querySelector('.ad-dots');
            
            if (!track || !dataList.length) return;

            var intervalTime = parseInt(container.getAttribute('data-interval')) || 3000;
            var ads = Array.from(dataList).map(function(li) {
                return {
                    img: li.getAttribute('data-img'),
                    link: li.getAttribute('data-link')
                };
            });

            var currentIndex = 0;
            var timer = null;
            var isAnimating = false;

            // 初始化 DOM：生成滑动结构
            track.innerHTML = '';
            ads.forEach(function(ad, index) {
                // 构建 a 标签包裹 img
                var a = document.createElement('a');
                a.href = ad.link;
                a.target = '_blank';
                var img = document.createElement('img');
                img.src = ad.img;
                img.alt = '广告';
                a.appendChild(img);
                track.appendChild(a);

                // 生成圆点
                if (dotsContainer) {
                    var dot = document.createElement('span');
                    dot.className = 'ad-dot' + (index === 0 ? ' active' : '');
                    dot.addEventListener('click', function() {
                        if (isAnimating || currentIndex === index) return;
                        currentIndex = index;
                        slideTo(currentIndex);
                        resetTimer();
                    });
                    dotsContainer.appendChild(dot);
                }
            });

            var dots = container.querySelectorAll('.ad-dot');

            // 核心滑动逻辑
            function slideTo(index) {
                isAnimating = true;
                // 向左平移，每次移动 100% 的宽度
                track.style.transform = 'translateX(-' + (index * 100) + '%)';
                
                // 更新圆点状态
                dots.forEach(function(dot, idx) {
                    dot.classList.toggle('active', idx === index);
                });

                // 等待 CSS 过渡动画完成（0.6s），解锁动画状态
                setTimeout(function() {
                    isAnimating = false;
                }, 600); 
            }

            // 自动轮播
            function startTimer() {
                timer = setInterval(function() {
                    if (isAnimating) return;
                    currentIndex = (currentIndex + 1) % ads.length;
                    slideTo(currentIndex);
                }, intervalTime);
            }

            function resetTimer() {
                clearInterval(timer);
                startTimer();
            }

            // 启动
            startTimer();
            
            // 鼠标悬停时暂停
            container.addEventListener('mouseenter', function() { clearInterval(timer); });
            container.addEventListener('mouseleave', startTimer);
        });
    }

    document.addEventListener('DOMContentLoaded', initAdCarousels);
    document.addEventListener('pjax:complete', initAdCarousels);
})();
// 小工具广告板块轮播 结束



// 音乐播放器交互代码 开始

(function () {
    'use strict';

    function hexoMucisCwInit() {
        document.querySelectorAll('.hexo_mucis_cw_player').forEach(function (player) {
            if (player.dataset.hexoMucisCwInitialized === 'true') return;

            const audio = player.querySelector('.hexo_mucis_cw_audio');
            const toggle = player.querySelector('.hexo_mucis_cw_toggle');
            const seek = player.querySelector('.hexo_mucis_cw_seek');
            const volume = player.querySelector('.hexo_mucis_cw_volume_range');
            const loop = player.querySelector('.hexo_mucis_cw_loop');
            const current = player.querySelector('.hexo_mucis_cw_current');
            const duration = player.querySelector('.hexo_mucis_cw_duration');

            if (!audio || !toggle || !seek || !volume || !loop) return;

            player.dataset.hexoMucisCwInitialized = 'true';

            audio.volume = 0.35;
            audio.loop = true;
            audio.autoplay = true;

            volume.value = '0.35';

            function formatTime(time) {
                if (!Number.isFinite(time)) return '00:00';
                const min = Math.floor(time / 60);
                const sec = Math.floor(time % 60);
                return String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
            }

            function updateLoopState() {
                audio.loop = !audio.loop;
                loop.classList.toggle('hexo_mucis_cw_loop_active', audio.loop);
                loop.setAttribute('aria-pressed', String(audio.loop));
                loop.setAttribute('aria-label', audio.loop ? '关闭循环播放' : '开启循环播放');
                loop.textContent = audio.loop ? '↻ 循环播放' : '↻ 单曲播放';
            }

            function playAudio() {
                if (!audio.paused) return Promise.resolve();

                return audio.play().catch(function (error) {
                    console.warn('音乐自动播放未获浏览器许可：', error);
                });
            }

            function unlockAudio() {
                playAudio();
                document.removeEventListener('pointerdown', unlockAudio, true);
                document.removeEventListener('touchstart', unlockAudio, true);
                document.removeEventListener('keydown', unlockAudio, true);
            }

            loop.classList.add('hexo_mucis_cw_loop_active');
            loop.addEventListener('click', updateLoopState);

            toggle.addEventListener('click', function () {
                if (audio.paused) {
                    playAudio();
                } else {
                    audio.pause();
                }
            });

            audio.addEventListener('play', function () {
                toggle.textContent = 'Ⅱ';
                toggle.setAttribute('aria-label', '暂停音乐');
                player.classList.add('hexo_mucis_cw_playing');
            });

            audio.addEventListener('pause', function () {
                toggle.textContent = '▶';
                toggle.setAttribute('aria-label', '播放音乐');
                player.classList.remove('hexo_mucis_cw_playing');
            });

            audio.addEventListener('timeupdate', function () {
                if (!Number.isFinite(audio.duration)) return;
                seek.value = audio.currentTime / audio.duration * 100;
                current.textContent = formatTime(audio.currentTime);
            });

            audio.addEventListener('loadedmetadata', function () {
                duration.textContent = formatTime(audio.duration);
            });

            audio.addEventListener('durationchange', function () {
                duration.textContent = formatTime(audio.duration);
            });

            seek.addEventListener('input', function () {
                if (Number.isFinite(audio.duration)) {
                    audio.currentTime = Number(seek.value) / 100 * audio.duration;
                }
            });

            volume.addEventListener('input', function () {
                audio.volume = Number(volume.value);
            });

            audio.addEventListener('error', function () {
                toggle.textContent = '!';
                toggle.setAttribute('aria-label', '音乐加载失败');
            });

            document.addEventListener('pointerdown', unlockAudio, true);
            document.addEventListener('touchstart', unlockAudio, true);
            document.addEventListener('keydown', unlockAudio, true);

            playAudio();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hexoMucisCwInit);
    } else {
        hexoMucisCwInit();
    }

    document.addEventListener('pjax:complete', hexoMucisCwInit);
})();
// 音乐播放器交互代码 结束