/*
notes:
this code is done with sveltekit in mind
assume that data represents all data that can be received from the device as an object where each data source can be accessed via a key with the same name.
*/

let modules: any = $state(["hwm-temps", "hwm-memory", "hwm-disk",]);
let data: any = $state({
    "hwm-temps": [],
    "hwm-memory": [],
    "hwm-disk": [],
});

let tempFormat = $derived({
    label: Object.keys(data["hwm-temps"]).map((val) => val.replace(/_/g, " ")),
    value: Object.values(data["hwm-temps"]), // .map((val) => formatNumericVal(val)),
    unit: ["°C"],
});

let memoryFormat = $derived({
    label: Object.keys(data["hwm-memory"]).map((val) => formatTitle(val)),
    value: Object.values(data["hwm-memory"]), // .map((val) => formatNumericVal(val)),
    unit: [
        "B", // active memory
        "B", // anonhugepages
        "B", // available memory
        "B", // buffers memory
        "B", // cached memory
        "B", // commitlimit
        "B", // committed as
        "B", // dirty
        "B", // free memory
        "B", // high free
        "B", // high total
        "B", // hugepages free
        "B", // hugepages rsvd
        "B", // hugepages size
        "B", // hugepages surp
        "B", // hugepages total
        "B", // inactive memory
        "B", // low free
        "B", // low total
        "B", // mapped
        "B", // pagetables
        "B", // shared
        "B", // slab
        "B", // sreclaimable
        "B", // sunreclaim
        "B", // swap device /dev/zram0 free
        "B", // swap device /dev/zram0 total
        "B", // swap device /dev/zram0 used
        "%", // swap device /dev/zram0 used percent
        "B", // swap free
        "B", // swap page fault
        "B", // swap page in
        "B", // swap page maj fault
        "B", // swap page out
        "B", // swap s in
        "B", // swap s out
        "B", // swap total
        "B", // swap used
        "%", // swap used percent
        "B", // swapcached
        "B", // total memory
        "B", // used memory
        "%", // used percent
        "B", // vmalloc chunk
        "B", // vmalloc total
        "B", // vmalloc used
        "B", // wired memory
        "B", // writeback
        "B", // writebacktmp
    ],
});

let diskFormat = $derived({
    label: Object.keys(data["hwm-disk"]).map((val) => formatTitle(val).replace("Mmcblk0p2 ", "")),
    value: Object.values(data["hwm-disk"]), // .map((val) => formatNumericVal(val)),
    unit: ["B", "B", "B", "%"],
});

function formatTitle(val: string) {
    return val.replace(/_/g, " ")
        .replace(/\w\S*/g, word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
}