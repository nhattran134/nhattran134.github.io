---
title: 'Java Maven Microservice Pipeline'
description: 'CI/CD pipeline for Java Maven microservices with container builds, Helm deployments, and SonarQube quality gates.'
tags: ['GitHub Actions', 'Java', 'Maven', 'Kubernetes', 'Helm']
date: '2026-04-01'
---

## Overview

Built a reusable CI/CD pipeline for Java Maven microservices, covering build, test, containerize, scan, and deploy to Kubernetes.

## Technical Highlights

- Maven build with dependency caching and parallel test execution
- Container image builds with multi-stage Dockerfiles
- SonarQube quality gates integrated into PR checks
- Trivy container image scanning before registry push
- Helm-based deployments to Kubernetes with environment promotion
- Artifact versioning tied to Git tags and Maven release plugin

## Pipeline Flow

Build → Test → SonarQube → Docker Build → Trivy Scan → Push to Registry → Helm Deploy
