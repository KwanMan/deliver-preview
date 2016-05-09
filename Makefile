BIN = ./node_modules/.bin
SCRIPTS = ./build

.PHONY: build release-patch release-minor release-major release-dry-run

build:
	$(BIN)/webpack --progress --colors

release-patch:
	@inc=patch $(SCRIPTS)/release.js

release-minor:
	@inc=minor $(SCRIPTS)/release.js

release-major:
	@inc=major $(SCRIPTS)/release.js