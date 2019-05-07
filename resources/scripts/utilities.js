// 	Copyright 2019 Rumesh Sudhaharan
//
// This file is part of bio_souls.
//
// bio_souls is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// bio_souls is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with bio_souls.  If not, see <https://www.gnu.org/licenses/>.

console.log("utilities.js connected");

function enable_option(yes_op, no_op) {
	$(".user_option").removeClass("invisible").addClass("visible");

	for (var key in yes_op) {
		$("#uo_yes").attr("data-"+key, yes_op[key]);
	}

	for (var key in no_op) {
		$("#uo_no").attr("data-"+key, no_op[key]);
	}
}

function disable_option() {
	$(".user_option").removeClass("visible").addClass("invisible");

	for (key in $("#uo_yes").data()) {
		$("#uo_yes").removeAttr("data-"+key);
	}

	for (key in $("#uo_no").data()) {
		$("#uo_no").removeAttr("data-"+key);
	}
}

function check_attr(element, attr) {
	if (typeof($(element).attr("data-"+attr)) !== typeof(undefined)) {
		return true;
	} else {
		return false;
	}
}

function print_info(text) {
	$("#info_text").text(text);
}