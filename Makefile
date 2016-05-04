BIN = ./node_modules/.bin

.PHONY: build

build:
	(cd ./node_modules/qubit-styles && make build)
	$(BIN)/webpack --progress --colors