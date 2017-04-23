import * as $ from 'jquery';
(<any>window).jQuery = $;

import 'jquery.validation';
import 'jquery-validation-unobtrusive';

(() => {
	//Works fine
	//$('body').css('background-color', 'green');
})();