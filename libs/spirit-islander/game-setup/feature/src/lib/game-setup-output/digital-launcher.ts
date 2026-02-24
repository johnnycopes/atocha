import { GameSetup } from '@atocha/spirit-islander/game-setup/util';
import { getAdversaryIdentifierById } from './get-adversary-identifier-by-id';
import { Spirit } from '@atocha/spirit-islander/shared/util';

export function getExpansionIdentifierByName(name: string): string {
  if (name === 'Branch & Claw') {
    return 'BranchAndClaw';
  } else if (name === 'Jagged Earth') {
    return 'JaggedEarth';
  } else {
    return '';
  }
}

function getParams(setup: GameSetup): string {
  let url =
    '?spirits=' +
    setup.spirits
      .filter((s) => s.spiritIdentifier !== undefined)
      .map((s) => s.spiritIdentifier)
      .join(',');
  url +=
    '&aspects=' +
    setup.spirits
      .filter((s) => s.aspectIdentifier !== undefined)
      .map((s) => s.aspectIdentifier)
      .join(',');
  if (setup.map.name === 'Thematic') {
    url += '&boards=' + setup.boards.map((b) => b.thematicIdentifier).join(',');
  } else {
    url += '&boards=' + setup.boards.map((b) => b.name).join(',');
  }
  if (setup.adversaryLevel.id !== 'none') {
    url += '&adversary=' + getAdversaryIdentifierById(setup.adversaryLevel.id);
    url += '&adversaryLevel=' + setup.adversaryLevel.level;
  }
  if (setup.scenario?.identifier) {
    url += '&scenario=' + setup.scenario.identifier;
  }
  if (setup.expansions) {
    url +=
      '&useExpansions=' +
      setup.expansions
        .map((e) => getExpansionIdentifierByName(e))
        .filter((id) => id != '')
        .join(',');
  }
  url += '&useEvents=1';
  return url;
}

function isSupported(spirit: Spirit): boolean {
  return spirit.spiritIdentifier !== undefined;
}

export function canLaunch(setup: GameSetup): boolean {
  return setup.spirits.filter((s) => !isSupported(s)).length === 0;
}

export function buildMobileLaunchUrl(setup: GameSetup): string {
  const url =
    'http://play.spiritislanddigital.com/screen/NewGame' + getParams(setup);
  return url;
}

export function buildSteamLaunchUrl(setup: GameSetup): string {
  const url =
    'steam://run/1236720/?url=spiritisland%3A%2F%2Fscreen%2FNewGame' +
    encodeURIComponent(getParams(setup));
  return url;
}
