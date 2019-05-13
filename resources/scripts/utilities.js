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

function enable_option(op_1, op_2) {
	disable_option();
	$(".user_option").removeClass("invisible").addClass("visible");

	console.log(op_1);
	console.log(op_2);


	for (var key in op_1) {
		if (key === "text") {
			$("#uo_1").text(op_1['text']);
		}
		$("#uo_1").attr("data-"+key, op_1[key]);
	}

	for (var key in op_2) {
		if (key === "text") {
			$("#uo_2").text(op_2['text']);
		}
		$("#uo_2").attr("data-"+key, op_2[key]);
	}
}

function disable_option() {
	$(".user_option").removeClass("visible").addClass("invisible");

	for (key in $("#uo_1").data()) {
		$("#uo_1").removeData(key);
	}

	for (key in $("#uo_2").data()) {
		$("#uo_2").removeData(key);
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

function set_loc(room) {
	$("#location_element").text(room);
}

function rand_buff() {
	var num = Math.random();
	if (num < 0.33) 	return "fire";
	else if (num <0.66)	return "water";
	else 				return "grass";
}

function calc_success(prob) {
	var num = Math.random();
	if (num < prob) return true;
	else 			return false;
} 

function user_action(attack) {
	if (attack) {
		switch (player.attack) {
			case 'fire':
				if (boss.defence == "fire")			return calc_success(0.5);
				else if (boss.defence == "water")	return calc_success(0.25);
				else if (boss.defence == "grass")	return calc_success(0.75);
				break;
			case 'water':
				if (boss.defence == "fire")			return calc_success(0.75);
				else if (boss.defence == "water")	return calc_success(0.5);
				else if (boss.defence == "grass")	return calc_success(0.25);
				break;
			case 'grass':
				if (boss.defence == "fire")			return calc_success(0.25);
				else if (boss.defence == "water")	return calc_success(0.75);
				else if (boss.defence == "grass")	return calc_success(0.5);
				break;
		}
	} else {
		switch (player.defence) {
			case 'fire':
				if (boss.attack == "fire")			return calc_success(0.5);
				else if (boss.attack == "water")	return calc_success(0.25);
				else if (boss.attack == "grass")	return calc_success(0.75);
				break;  
			case 'water':
				if (boss.attack == "fire")			return calc_success(0.75);
				else if (boss.attack == "water")	return calc_success(0.5);
				else if (boss.attack == "grass")	return calc_success(0.25);
				break;
			case 'grass':
				if (boss.attack == "fire")			return calc_success(0.25);
				else if (boss.attack == "water")	return calc_success(0.75);
				else if (boss.attack == "grass")	return calc_success(0.5);
				break;
		}
	}
}