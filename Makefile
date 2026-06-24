.PHONY: dev test build check lint db-up db-reset setup

dev:      ## Start dev server (Docker + Next.js)
	@echo "==> Starting Docker services..."
	docker compose up -d 2>/dev/null || true
	@echo "==> Starting Next.js dev server..."
	bun run dev

test:     ## Run unit tests
	bun run test

build:    ## Production build
	bun run build

lint:     ## Lint + typecheck
	bun run lint && bun run typecheck

check:    ## Full check (lint + typecheck + test + build)
	bun run lint && bun run typecheck && bun run test && bun run build

db-up:    ## Start DB services only
	docker compose up -d postgres redis

db-reset: ## Reset database
	bun run db:push --accept-data-loss 2>/dev/null; bunx prisma db push --accept-data-loss
	@echo "==> DB reset complete"

setup:    ## First-time setup
	cp -n web/.env.example web/.env.local 2>/dev/null || true
	bun install
	docker compose up -d 2>/dev/null || echo "==> Docker not available, skipping"
	@echo "==> Setup complete! Run 'make dev' to start."

help:     ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
