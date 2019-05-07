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
	trap_rm_clicks: 0,
	puzzle_rm_clicks: 0,
	rune_clicks: 0,

	dull_cube_placed: false
}

var player = {
	death_count: 0,

	enhanced_speed: false,
	enhanced_vision: false,
	enhanced_endurance: false,

	has_dull_cube: false
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

	// $("#open_room_npc").removeAttr('disabled');
	// trait_calc(1, "speed");
	// trait_calc(1, "vision");

	$("#info_text").text("There are 3 doors in front of you");

	$(".door").click(function() {
		open_room($(this).attr('data-room'));

		if (check_attr(this, "dead")) {
			console.log("dead");
			player_died();
		}
	});

	$(".user_option").click(function() {
		switch ($(this).data('id')) {
			case 'dull_cube_pick_up':
				console.log((check_attr(this, 'pick_up')) ? true : false);
				player.has_dull_cube = (check_attr(this, 'pick_up')) ? true : false;
				disable_option();
				open_room("dark_room");
				break;
			case 'puzzle_rm_cube_place':
				if (check_attr(this, 'place_item')) {
					system.dull_cube_placed = true;
					player.has_dull_cube = false;
				} else {
					system.dull_cube_placed = false;
					player.has_dull_cube = true;
				}
				disable_option();
				break;
			case 'puzzle_rm_approach_light':
				if (check_attr(this, 'approach')) {
					// next room
				}
				break;
		}
	})

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
		open_room("start_room");
	})
})	