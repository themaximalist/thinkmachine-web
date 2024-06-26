import Line from './Line';
import Hyperedge from './Hyperedge';
import Node from './Node';

export default class Hypertext extends Line {
    constructor() {
        super(...arguments);
    }

    get hypertext() {
        return this.line;
    }

    set hypertext(value) {
        this.line = value;
    }

    matches(hyperedge) {
        for (const symbol of hyperedge.symbols) {
            if (this.hypertext.includes(symbol)) {
                return true;
            }
        }

        return false;
    }

    get owners() { return this.tree.hyperedges.filter(hyperedge => this.matches(hyperedge)) }
    get ownerSymbols() { return this.owners.flatMap(hyperedge => hyperedge.symbols) }
}


/*
import { visitParents } from 'unist-util-visit-parents'

export default class Hypertext {
    constructor(data, hypertexts) {
        this.data = data;
        this.hypertexts = hypertexts;
    }

    get value() {
        return this.data.value;
    }

    set value(value) {
        this.data.value = value;
        this.hypertexts.schematic.update();
        this.schematic.onUpdate({ event: "hypertext.update", data: this });
    }

    get owners() {
        return this.data.owners;
    }

    get schematic() {
        return this.hypertexts.schematic;
    }

    remove() {
        const owners = this.owners;
        visitParents(this.hypertexts.tree, (node, parents) => {
            if (node === this.data) {
                const parent = parents[parents.length - 1];
                const index = parent.children.indexOf(node);
                parent.children.splice(index, 1);

                const data = { value: this.value, owners };

                this.schematic.onUpdate({ event: "hypertext.remove", data });
            }
        });

        this.schematic.removeEmptySections(owners);
    }
}
    */