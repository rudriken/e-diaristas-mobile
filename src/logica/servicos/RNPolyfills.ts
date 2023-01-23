import "intl";
import "intl/locale-data/jsonp/pt-BR";

if (!String.prototype.replaceAll) {
	// @ts-ignore
	String.prototype.replaceAll = function (car_substuindo: string, car_substituto: string) {
		return this.replace(new RegExp(car_substuindo, "g"), car_substituto);
	};
}
