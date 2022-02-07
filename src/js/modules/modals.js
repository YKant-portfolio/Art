const modals = () => {
	let btnPressed = false;
	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'),
			scroll = calcScroll(),
			present = document.querySelector('.fixed-gift');

		function openModal(event) {
			const target = event.target;
			if (target) {
				event.preventDefault();
				btnPressed = true;
				if (destroy) {
					target.remove();
				}
				windows.forEach(item => {
					item.style.display = 'none';
				});
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scroll}px`;
				present.style.marginRight = `${scroll}px`;
			}
			attachModalEvents();
		}



		trigger.forEach(item => {
			item.addEventListener('click', openModal);
		});

		function closeModal(event) {
			if (event.target === close || event.key === "Escape" || event.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', 'fadeIn');
				});
				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
				present.style.marginRight = `0px`;

			}
		}

		function attachModalEvents() {
			close.addEventListener('click', closeModal);
			modal.addEventListener('click', closeModal);
			document.addEventListener('keydown', closeModal);
		}


		function showModalByTime(selector, timeout) {
			setTimeout(function () {
				let displayModal;
				document.querySelectorAll('[data-modal').forEach(item => {
					if (getComputedStyle(item).display !== 'none') {
						displayModal = 'block';
					}
				})
				if (!displayModal) {
					document.querySelector(selector).style.display = 'block';
					document.body.style.overflow = "hidden";
					document.body.style.marginRight = `${scroll}px`;
					present.style.marginRight = `${scroll}px`;
				}
			}, timeout);
			attachModalEvents();
		}

		// showModalByTime('.popup-consultation', 6000); // не забыть включить

	}


	function calcScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.append(div);
		let srollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return srollWidth;
	}

	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
				document.querySelector(selector).click();
			}
		})
	}


	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
	openByScroll('.fixed-gift')

};

export default modals;