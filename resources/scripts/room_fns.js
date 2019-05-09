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

function initial_rm_click_fn() {
	switch (system.clicks) {
		case 0: print_info("You wake up from a splitting headache and notice your arms with broken shackles.");	break;
		case 1: print_info("You don’t seem to remember anything or how you ended up here. ");					break;
		case 2: print_info("This place reeks of death.");														break;
		case 3: print_info("You can’t stand it any longer so you get up and open the gate.");					break;
		case 4: print_info("You climb up the stairs and notice three paths ahead of you. ");					break;
		case 5: open_room("start_room");																		break;
	}

	system.clicks++;
}

function courtyard_click_fn() {
	switch (system.clicks) {
		case 0: print_info("You push the gate and walk forwards into the courtyard. ");													break;
		case 1: print_info("The courtyard appears to be worn and broken. You continue to walk forwards and you hear rocks crumbling.");	break;
		case 2: print_info("The floor beneath you cracks and you fall down with it.");													break;
		case 3: print_info("You can barely feel your arms but you successfully get up.");												break;
		case 4: print_info("Just as you look up a giant rock falls from above and falls on you.");										break;
		case 5: 
			open_room("death_room");	
			player_died(); 
			break;
	}

	system.clicks++;
}

function rune_rm_click_fn() {
	if (system.approach_statue) {
		switch (system.clicks) {
			case 0: print_info("The statue has two arms…perhaps you could put something on it? ");			break;
			case 1: print_info("Would you like to place the runes on the hands?");	open_room("npc_room");	break;
		}
	} else if (system.rune_wall_broken) {
		switch (system.clicks) {
			case 0: print_info("You pull a rock from the wall and the wall crumbles down to reveal a glowing statue. Several runes lying beside it.");	break;
			case 1: 
				print_info("Will you approach the statue?");
				enable_option(
					{"option": "approach_rune_statue", "text": "Yes", "action": true},
					{"option": "approach_rune_statue", "text": "No", "action": false}
				)
				break;
		}
	} else {
		switch (system.clicks) {
			case 0: print_info("You notice a strange wall.");	break;
			case 1: print_info("It seems ready to break.");		break;
			case 2: 
				if (player.death_count == 0) {
					print_info("Maybe you should you check out the other doors.");
				} else {
					print_info("Will you break the wall?");
					enable_option(
						{"option": "break_rune_wall", "text": "Yes", "action": true},
						{"option": "break_rune_wall", "text": "No", "action": false}
					);
				}
				break;
			case 3:
				if (player.death_count == 0) {
					open_room("start_room");
				}
				break;
		}
	}
	system.clicks++;
}

function fight_zombie_click_fn() {
	console.log("fight_zombie_click_fn");
	switch (system.clicks) {
		case 0:
			if (player.enhanced_speed) {
				print_info("You try to fight it off and you successfully break it down.");
			} else {
				print_info("You try to fight it off but you the skeleton overwhelms you.");
			}
			break;
		case 1:
			if (player.enhanced_speed) {
				print_info("You walk away but you hear the dreaded sound again and this time more skeletons arise and jump at you. ");
			} else {
				player_died();
				open_room("death_room");
			}
			break;
		case 2:
			if (player.enhanced_speed) {
				print_info("The room is enveloped with the skeletons and they overwhelm you.");
			}
			break;
		case 3:
			if (player.enhanced_speed) {
				player_died();
				open_room("death_room");
			}
	}

	system.clicks++;
}

function push_zombie_click_fn() {
	console.log("push_zombie_click_fn");
	switch (system.clicks) {
		case 0: print_info("You push yourself against a wall and the skeleton loses its grasp.");					break;
		case 1: print_info("You immediately sprint ahead.");														break;
		case 2: 
			if (player.enhanced_speed) { 
				open_room("dark_room");
			} else {
				print_info("However, you’re too slow.");
			}
			break;
		case 3: if (!player.enhanced_vision) print_info("Skeletons catch up to you and you lose your balance.");	break;
		case 4: 
			if (!player.enhanced_vision) {
				player_died();
				open_room("death_room");
			}
			break;
	}
	system.clicks++;
}

function undead_rm_click_fn() {
	console.log("undead_rm_click_fn");
	switch (system.clicks) {
		case 0: print_info("You push through the rusted door and it closes behind you. You attempt to walk forwards but you hear a crackle. ");	break;
		case 1: print_info("You step on something and as you look below. ");																	break;
		case 2: print_info("Bones.");																											break;
		case 3: print_info("You hear a deafening screech");																						break;
		case 4: print_info("A skeleton from below claws at your arm and pulls you down!");														break;
		case 5: 
			print_info("What will you do?");																								
			enable_option(
				{"option": "fight_zombie", "text": "Fight the skeleton", "action": true},
				{"option": "fight_zombie", "text": "Push it away and run forwards", "action": false}
			);
			break;
	}

	system.clicks++;
}

function item_rm_click_fn() {
	switch (system.clicks) {
		case 0: 
			if (player.has_item) {
				print_info("You have already explored this room.");
			} else {
				print_info("This room is pitch black."); 				
			}
			break;
		case 1: 
			if (player.has_item) {
				open_room("dark_room");
			} else if (player.enhanced_vision) {
				print_info("You notice red lines all across the room.");
			} else {
				print_info("You are unable to see anything. ");
			}
			break;
		case 2:
			if (player.enhanced_vision) {
				print_info("Will you follow the red lines?");
				enable_option(
					{"option": "follow_red_line", "text": "Yes", "action": true},
					{"option": "follow_red_line", "text": "No", "action": false}
				);
			} else {
				print_info("You try to hold onto something and you hear a click.");
			}
			break;
		case 3:
			if (!player.enhanced_vision) {
				print_info("You hear knife slicing past the air…");
			}
			break;
		case 4:
			if (!player.enhanced_vision) {
				player_died();
				open_room("death_room");
			}
	}

	system.clicks++;
}

function follow_line_click_fn() {
	switch (system.clicks) {
		case 0: print_info("You reach the end of the room and notice a skeleton.");				break;
		case 1: print_info("The skeleton doesn’t seem to move but is holding onto something.");	break;
		case 2: 
			print_info("Will you take it? ");
			enable_option(
				{"option": "pick_up_item", "text": "Yes", "action": true},
				{"option": "pick_up_item", "text": "No", "action": false}
			);
			break;
	}
	system.clicks++;
}

function puzzle_rm_click_fn() {
	switch (system.clicks) {
		case 0: print_info("You enter a brightly lit room with strange carvings on the wall.");	break;
		case 1: print_info("They are reminiscent of the statue from the earlier room.");		break;
		case 2: print_info("You see a square-shaped hole within the wall…");					break;
		case 3: 
			if (player.has_item) {
				print_info("Will you place the stone inside the wall?");	
				enable_option(
					{"option": "place_item", "text": "Yes", "action": true},
					{"option": "place_item", "text": "No", "action": false}
				);
			} else {
				open_room("dark_room");
			}
			break;
	}
	system.clicks++;
}

function close_room() {
	$(".room").addClass("invisible").removeClass("visible");
	$("#you_died_vid").get(0).pause();
	$(document).off("click", initial_rm_click_fn);
	$(document).off("click", courtyard_click_fn);
	$(document).off("click", rune_rm_click_fn);
	$(document).off("click", undead_rm_click_fn);
	$(document).off("click", fight_zombie_click_fn);
	$(document).off("click", push_zombie_click_fn);
	$(document).off("click", item_rm_click_fn);
	$(document).off("click", follow_line_click_fn);
	$(document).off("click", puzzle_rm_click_fn);
}

function open_room(room_name) {
	close_room();
	$("#"+room_name).removeClass("invisible").addClass("visible");
	set_loc($("#"+room_name).data("cur_room"));
	console.log(room_name);
	switch (room_name) {
		case 'start_room': print_info("");																	break;
		case 'death_room': 	print_info("");																	break;
		case 'dark_room': 	print_info("You enter a dimly-lit room with two doors on opposite sides.");		break;
		case 'npc_room': 	
			system.clicks = 0;
			if (!system.approach_statue) close_room();
			$(document).on("click", rune_rm_click_fn);
			break;
	}
}