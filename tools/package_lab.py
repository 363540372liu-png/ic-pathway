"""Build or check the deterministic standalone lab, using only stdlib."""
import argparse
import io
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LAB_FILES = (
    'README.txt', 'dc/constraints.sdc', 'dc/run.tcl', 'filelist.f',
    'rtl/counter.v', 'run_dc.sh', 'run_iverilog.sh', 'run_vcs.sh',
    'tb/tb_counter.sv',
)


def archive_bytes():
    output = io.BytesIO()
    entries = {name: (ROOT / 'lab' / name).read_bytes() for name in LAB_FILES}
    entries['LICENSE'] = (ROOT / 'LICENSE').read_bytes()
    with zipfile.ZipFile(output, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(entries.items()):
            entry = zipfile.ZipInfo('ic-counter-lab/' + name, (1980, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            entry.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(entry, data)
    return output.getvalue()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if generated files are stale')
    args = parser.parse_args()
    out = ROOT / 'dist' / 'downloads'
    expected = {
        out / 'ic-counter-lab.zip': archive_bytes(),
        out / 'README.txt': (ROOT / 'lab' / 'README.txt').read_bytes(),
    }
    if args.check:
        for path, data in expected.items():
            if not path.is_file() or path.read_bytes() != data:
                raise SystemExit('Stale lab download: run python3 tools/package_lab.py')
        with zipfile.ZipFile(io.BytesIO(expected[out / 'ic-counter-lab.zip'])) as archive:
            assert archive.testzip() is None
            assert len(archive.namelist()) == len(LAB_FILES) + 1
            assert all('..' not in Path(name).parts and not name.startswith('/')
                       for name in archive.namelist())
        print('Lab archive, source freshness, paths, and included license verified.')
    else:
        out.mkdir(parents=True, exist_ok=True)
        for path, data in expected.items():
            path.write_bytes(data)
        print('Deterministic lab archive and instructions generated.')


if __name__ == '__main__':
    main()
