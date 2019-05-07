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

console.log("room_fns.js connected");

function zombie_click_fn() {
	console.log(system.zombie_clicks);

	if (system.zombie_clicks > 0) {
		print_info((player.enhanced_speed) ? "You manage to outrun the zombies and reach a dark room with two doors" : "The zombies catch up to you and tear you to shreads.");
		$("#zombie_rm_btn").removeAttr("disabled");
	}

	system.zombie_clicks++;
}

function trap_rm_click_fn() {
	console.log(system.trap_rm_clicks);

	if (player.enhanced_vision) {
		switch(system.trap_rm_clicks) {
			case 1: print_info("You see a faint outline of an elevated tile and a dull cube");				break;
			case 2: 
				print_info("Would you like to pick up the cube?");
				enable_option(
					{"item": "dull_cube", "id": "dull_cube_pick_up", "pick_up": ""},
					{"item": "dull_cube", "id": "dull_cube_pick_up"}
				);
				break;
		}
	} else {
		switch (system.trap_rm_clicks) {
			case 1: print_info("The room is pitch black");													break;
			case 2: print_info("You take a step forward and hear a soft click");							break;
			case 3: print_info("You hear a soft whoosh sound and feel an arrow plunge hrough your heart");	break;
			case 4: print_info("");
				$("#open_death_room").click();
				break;
		}
	}

	system.trap_rm_clicks++;
}

function puzzle_rm_click_fn() {
	console.log(system.puzzle_rm_clicks);

	if (system.dull_cube_placed) {
		switch (system.puzzle_rm_clicks) {
			case 3: print_info("The carvings begin to light up slowly.");													break;
			case 4: print_info("A large rectangle of light with the silhouette of a person appears on the right wall.");	break;
			case 5: 
				print_info("Do you want to approach the light?");
				enable_option(
					{"id": "puzzle_rm_approach_light", "approach": ""},
					{"id": "puzzle_rm_approach_light"}
				);
				break;
		}
	} else if (player.has_dull_cube) {
		switch (system.puzzle_rm_clicks) {
			case 1: print_info("At the center of the carvings, there is a small square shaped hole");	break;
			case 2: 
				print_info("Would you like to place the cube in the hole?");
				enable_option(
					{"id": "puzzle_rm_cube_place", "place_item": ""}, 
					{"id": "puzzle_rm_cube_place"}
				);
				break;
			case 3: 
				$("#puzzle_rm_btn").removeAttr("disabled");												break;
		}
	} else {
		if (system.puzzle_rm_clicks > 0) {
			print_info("At the center of the carvings, there is a small square shaped hole");
			$("#puzzle_rm_btn").removeAttr("disabled");
		}
	}
	system.puzzle_rm_clicks++;
}

function close_room() {
	$(".room").addClass("invisible").removeClass("visible");
	print_info("");
	$("#you_died_vid").get(0).pause();
	$(document).off("click", zombie_click_fn);
	$(document).off("click", trap_rm_click_fn);
	$(document).off("click", puzzle_rm_click_fn);
}

function open_room(room_name) {
	close_room();
	$("#"+room_name).removeClass("invisible").addClass("visible");
	$("#location_element").text($("#"+room_name).data("cur_room"));
	console.log(room_name);
	switch (room_name) {
		case 'start_room': 			print_info("There are 3 doors in front of you");				break;
		case 'zombie_room': 		
			print_info("Theres a horde of zombies running at you!");
			system.zombie_clicks = 0;
			$("#zombie_rm_btn").attr("disabled", "");
			$(document).on("click", zombie_click_fn);
			break;
		case 'npc_room': 			print_info("Theres an npc here. Choose your traits");			break;
		case 'dark_room': 			print_info("There appear to be two doors in front of you.");	break;
		case 'trap_room': 			
			print_info("You open the mysterious door on the left");
			system.trap_rm_clicks = 0;
			$("#trap_rm_btn").attr("disabled", "");
			$(document).on("click", trap_rm_click_fn);
			break;
		case 'puzzle_room':
			print_info("You enter a brightly lit room with strange carvings on one wall");
			system.puzzle_rm_clicks = 0;
			$("#puzzle_rm_btn").attr("disabled", "");
			$(document).on("click", puzzle_rm_click_fn);
			break;
	}
}