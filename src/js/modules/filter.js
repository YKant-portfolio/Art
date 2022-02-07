const filter = () => {
	const menu = document.querySelector('.portfolio-menu'); // меню с триггерами
	const items = menu.querySelectorAll('li'); // сами триггеры 

	const wrapper = document.querySelector('.portfolio-wrapper'); // контейнер-обертка с фото
	const markAll = wrapper.querySelectorAll('.all'); // массив со всеми фотками
	const no = document.querySelector('.portfolio-no'); // спец запись для отстутвующих фото

	menu.addEventListener('click', (e) => {
		let target = e.target
		let classSelect = target.classList[0]; // на какой триггер в меню щелкнули
		let allElems = wrapper.querySelectorAll(`.${classSelect}`); // находим класс с названием триггера
		typeFilter(allElems); // передаем в качестве аргумента в функцию фильтр

		if (target && target.tagName === 'LI') { // если кликнули является селектором li то:
			items.forEach((btn) => btn.classList.remove('active')); // переберем все триггеры в меню и уберем класс активности со всех
			target.classList.add('active'); // на какой триггер кликнули у того и будет класс активности
		}
	});

	const typeFilter = (markType) => { // функия фильтр фоток (в аргументе название класса - какой выбрали) 
		markAll.forEach((mark) => { // перебирает массив со всеми фотками
			mark.style.display = 'none'; // убираем абсолютно все фотки  
			mark.classList.remove('animated', 'fadeIn'); // убираем анимацию   
		})

		no.style.display = 'none'; // убираем спец запись
		no.classList.remove('animated', 'fadeIn'); // убираем анимацию

		if (markType) { // если попадает класс куда кликнули то:
			markType.forEach((mark) => { // 1 перебираем их по одному и 
				mark.style.display = 'block'; // 2 показываем картинки 
				mark.classList.add('animated', 'fadeIn') // добавляем анимацию к картикам
			})
		}
		if (markType.length == 0) { // если в классе длинна 0 то: 
			no.style.display = 'block' // показываем спец класс
			no.classList.add('animated', 'fadeIn') // добаляем анимацию
		}
	};
};

export default filter;
