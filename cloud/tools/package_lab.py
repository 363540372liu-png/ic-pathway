from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'downloads'
out.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(out / 'ic-counter-lab.zip', 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for path in sorted((root / 'lab').rglob('*')):
        if path.is_file() and 'work' not in path.relative_to(root / 'lab').parts:
            archive.write(path, Path('ic-counter-lab') / path.relative_to(root / 'lab'))
(out / 'README.txt').write_text((root / 'lab' / 'README.txt').read_text())
print('Lab archive and instructions generated.')
