const mask = (selector) => {

	let setCursorPosition = (pos, elem) => {
		elem.focus();

		if (elem.setSelectionRange) {
			elem.addEventListener('mouseup', (e) => {
				e.preventDefault();
				elem.setSelectionRange(pos, pos);
			});
			elem.addEventListener('keyup', (e) => {
				if (e.code === 'ArrowLeft') {
					e.preventDefault();
					elem.setSelectionRange(pos, pos);
				}
			});

		} else if (elem.createTextRange) {
			let range = elem.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
		// console.log(elem.value.length);

	};

	function createMask(event) {  // создаем маску
		let matrix = '+7 (___)-___-__-__',  // та маска которую будем использовать
			i = 0,  // для передвижения по маске 
			def = matrix.replace(/\D/g, ''), //статичное работает на основе матрицы (все нецифры заменяем '') из матрицы получим только те значения которые не соответсвуют цифровым значениям
			val = this.value.replace(/\D/g, '');  // динамическое то что ввел пользователь (все нецифры заменяем '')

		if (def.length >= val.length) { // ели пользователь будет вдруг удалять 7и+ то у него это не выйдет
			val = def;
		}
		this.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		if (event.type === 'blur') {
			if (this.value.length == 2) {
				this.value = '';
			}
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	let inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	})
};

export default mask;