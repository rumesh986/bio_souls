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


console.log("main.js connected");

var system = {
	zombie_clicks: 0,
	rune_clicks: 0
}

var player = {
	death_count: 0,
	enhanced_speed: false,
	enhanced_vision: false,
	enhanced_endurance: false
}

function player_died() {
	player.death_count++;

	$("#open_room_npc").removeAttr('disabled');

	$("#player_death_count").text("you have died "+player.death_count+" times");
	$("#player_enhanced_speed").text((player.enhanced_speed) ? "You have obtained the enhanced speed trait" : "HIDEN INFORMATION");
	$("#player_enhanced_vision").text((player.enhanced_vision) ? "You have obtained the enhanced vision trait" : "HIDEN INFORMATION");
	$("#player_enhanced_endurance").text((player.enhanced_endurance) ? "You have obtained the enhanced endurance trait" : "HIDEN INFORMATION");

	console.log("You have died " + player.death_count + " times");

	$("#you_died_vid").get(0).play();
}

function close_room(room_name) {
	$(".room").addClass("invisible").removeClass("visible");
	$("#info_text").text("");
	$("#you_died_vid").get(0).pause();
	$(document).off("click", zombie_click_fn);
}

function zombie_click_fn() {
	console.log(system.zombie_clicks);

	if (system.zombie_clicks > 0) {
		$("#info_text").text((player.enhanced_speed) ? "You manage to outrun the zombies and reach a dark room with two doors" : "The zombies catch up to you and tear you to shreads.");
		$("#zombie_rm_btn").removeAttr("disabled");
	}

	system.zombie_clicks++;
}

function open_room(room_name) {
	$("#"+room_name).removeClass("invisible").addClass("visible");
	$("#location_element").text($("#"+room_name).data("cur_room"));
	console.log(room_name);
	switch (room_name) {
		case 'start_room': 			$("#info_text").text("There are 3 doors in front of you");										break;
		case 'zombie_room': 		
			$("#info_text").text("Theres a horde of zombies running at you!");
			system.zombie_clicks = 0;
			$("#zombie_rm_btn").attr("disabled", "");
			$(document).on("click", zombie_click_fn);
			break;
		case 'npc_room': 			$("#info_text").text("Theres an npc here. Choose your traits");									break;
		case 'trap_room': 			$("#info_text").text("Oops, you walked into a trap");											break;
		case 'puzzle_room': 		$("#info_text").text("Something doesnt seem right here");										break;
	}
}

function check_attr(element, attr) {
	if (typeof($(element).attr("data-"+attr)) !== typeof(undefined)) {
		return true;
	} else {
		return false;
	}
}

function trait_calc(prob, trait) {
	var trait_success = false;
	if (prob == 0) 		trait_success = false;
	else if (prob == 1)	trait_success = true;
	else {
		var num = Math.random();
		trait_success = (num < prob) ? true : false;
	}

	if (trait_success) {
		$("#trait_result_text").text("Congratulations, You have acheived the "+trait+" trait.");
		switch (trait) {
			case 'speed': 
				player.enhanced_speed = true;
				$("#zombie_rm_btn").removeClass("btn-danger").addClass("btn-primary");
				$("#zombie_rm_btn").attr("data-room", "dark_room");
				$("#zombie_rm_btn").removeAttr("data-dead");
				break;
			case 'vision': 		player.enhanced_vision 		= true;		break;
			case 'endurance': 	player.enhanced_endurance 	= true;		break;
		}
	} else {
		$("#trait_result_text").text("Unfortunately that did not do anything");
	}
}

$(document).ready(function() {
	console.log("document ready");
	$("#open_room_npc").removeAttr('disabled');
	$("#info_text").text("There are 3 doors in front of you");

	$(".door").click(function() {
		close_room($(this));
		open_room($(this).attr('data-room'));

		if (check_attr(this, "dead")) {
			console.log("dead");
			player_died();
		}
	});

	$("#submit_traits").click(function() {
		if ($("#trait_selector").find(".active.trait").length == 2) {
			var gene1 = $("#trait_selector").find(".active.trait")[0].dataset;
			var gene2 = $("#trait_selector").find(".active.trait")[1].dataset;

			var gene_traits = [gene1.trait, gene2.trait];
			var gene_dominance = [gene1.dominance, gene2.dominance];

			$("#ps_10").text(gene1.allele1);
			$("#ps_20").text(gene1.allele2);

			$("#ps_01").text(gene2.allele1);
			$("#ps_02").text(gene2.allele2);

			$("#ps_11").text(gene1.allele1+gene2.allele1);
			$("#ps_21").text(gene1.allele2+gene2.allele1);
			$("#ps_12").text(gene1.allele1+gene2.allele2);
			$("#ps_22").text(gene1.allele2+gene2.allele2);

			if (gene1.trait == gene2.trait) {
				console.log("it matches");					
				if (gene_dominance.includes("full")) {
					trait_calc(1, gene1.trait);
				} else if (gene_dominance.includes("partial")) {
					if (gene_dominance.includes("none")) {
						trait_calc(0.5, gene1.trait);
					} else {
						trait_calc(0.75, gene1.trait);
					}
				} else {
					trait_calc(0, gene1.trait);
				}
			} else {
				trait_calc(0, gene1.trait);
			}
			$("#trait_result").modal('show');
		} else {
			alert("Please select two traits");
		}
	})

	$("#trait_result").on('hide.bs.modal', function(e) {
		$(trait_selector).find(".trait.active").removeClass("active");
	})
})	