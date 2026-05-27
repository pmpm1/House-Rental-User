# AWS Deployment Manual (Step-by-Step)

## 1) Prerequisites
- AWS account, IAM admin user, GitHub repository.
- Install AWS CLI, Docker, Terraform (optional), and Tera Term for SSH.

## 2) IAM Setup
1. Create IAM role for GitHub OIDC with trust to `token.actions.githubusercontent.com`.
2. Attach policies for ECR, ECS, CloudWatch Logs, and CloudFormation updates.
3. Save role ARN in GitHub secret `AWS_ROLE_ARN`.

## 3) CloudFormation Base Stack
Create VPC, subnets, security groups, ECS cluster, ECR repos, ALB, and CloudWatch log groups.
Recommended: split into stacks:
- network.yaml
- compute.yaml
- cicd-support.yaml

## 4) EC2 (Optional Bastion)
1. Create EC2 in public subnet with SSH security group.
2. Connect using Tera Term with pem key.
3. Use EC2 for debugging private resources.

## 5) ECS Deployment
1. Build backend and frontend images and push to ECR.
2. Create ECS task definitions for both containers.
3. Create ECS service behind ALB target groups.
4. Enable auto scaling and health checks (`/health` for backend).

## 6) CloudWatch
- Configure logs for both containers.
- Add alarms: ECS CPU > 70%, ALB 5xx, task restart count.
- Add dashboards for request volume and latency.

## 7) CI/CD with GitHub Actions
- Workflow in `.github/workflows/ci-cd.yml` runs tests/build on push and PR.
- On `main` push, it calls `aws ecs update-service --force-new-deployment`.
- Store secrets: `AWS_ROLE_ARN`, `ECS_CLUSTER`, `ECS_SERVICE`.

## 8) Environment Variables
Copy `.env.example` to `.env` and update production values.
Store sensitive values in AWS Secrets Manager and inject in ECS task definition.

## 9) Local Testing
```bash
docker compose up --build
# frontend: http://localhost:3000
# backend:  http://localhost:8000/health
```

## 10) Next Improvements
- Add RDS PostgreSQL and S3 uploads for house photos.
- Add Amazon Location Service for map APIs.
- Add Amazon Lex chatbot for Burmese + English FAQ.
